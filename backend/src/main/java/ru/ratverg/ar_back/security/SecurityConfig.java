    package ru.ratverg.ar_back.security;

    import com.fasterxml.jackson.databind.ObjectMapper;
    import jakarta.servlet.http.HttpServletResponse;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.core.annotation.Order;
    import org.springframework.http.HttpMethod;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.AuthenticationProvider;
    import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
    import org.springframework.security.config.Customizer;
    import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.core.userdetails.UserDetailsService;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
    import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
    import org.springframework.security.web.context.NullSecurityContextRepository;
    import org.springframework.web.cors.CorsConfiguration;
    import org.springframework.web.cors.CorsConfigurationSource;
    import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
    import ru.ratverg.ar_back.security.filter.JWTAuthenticationFilter;
    import ru.ratverg.ar_back.security.filter.JsonUsernamePasswordAuthenticationFilter;
    import ru.ratverg.ar_back.service.JWTMainService;
    import ru.ratverg.ar_back.service.JwtTelegramService;

    import java.util.List;

    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {

        JWTMainService jwtMainService;

        @Autowired
        public SecurityConfig(JWTMainService jwtMainService) {
            this.jwtMainService = jwtMainService;
        }

        @Bean
        public AuthenticationProvider authenticationProvider(UserDetailsService userDetailsService,
                                                             PasswordEncoder passwordEncoder) {
            //configure to user DAO authentication provider
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setPasswordEncoder(passwordEncoder);
            //here we set our own UserDetailService realization "ARUserDetailService" Bean
            provider.setUserDetailsService(userDetailsService);
            return provider;
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
            return configuration.getAuthenticationManager();
        }

        // Cors configuration by GPT
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration config = new CorsConfiguration();

            // Set specific origins that are allowed to access the API (e.g., the frontend URL)
            config.setAllowedOrigins(List.of(
                    "http://localhost:5173",
                    "https://ebbinghaus-reminder.windway.dev",
                    "http://192.168.100.6:5173"
            ));

            // Define the HTTP methods that the frontend can use
            config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

            // Allow all headers to be sent in the request
            config.setAllowedHeaders(List.of("*"));

            // Crucial: Allows the browser to send cookies and authorization headers (like JSESSIONID)
            config.setAllowCredentials(true);

            // Register this configuration for all API paths ("/**")
            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", config);
            return source;
        }

        @Bean
        public JWTAuthenticationFilter jwtAuthFilter(){
            JWTAuthenticationFilter myJwtAuthFilter = new JWTAuthenticationFilter(jwtMainService);
            return myJwtAuthFilter;
        }



        @Bean
        public JsonUsernamePasswordAuthenticationFilter jsonAuthFilter(
                AuthenticationManager authenticationManager,
                ObjectMapper objectMapper) {
            JsonUsernamePasswordAuthenticationFilter myJsonFilter = new JsonUsernamePasswordAuthenticationFilter(authenticationManager, objectMapper);
            myJsonFilter.setFilterProcessesUrl("/api/login");
            myJsonFilter.setAuthenticationSuccessHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK));
            myJsonFilter.setAuthenticationFailureHandler((req, res, ex) -> res.setStatus(HttpServletResponse.SC_UNAUTHORIZED));
            return myJsonFilter;
        }



        //TWO INDEPENDENT FILTER CHAINS
        // notes: SecurityContext always only one!

        //FILTER CHAIN for the http request from web application
        @Bean
        @Order(2)
        public SecurityFilterChain appChain (
                HttpSecurity http,
                JsonUsernamePasswordAuthenticationFilter jsonAuthFilter,
                AuthenticationProvider provider
        ) throws Exception {
            return http
                    .securityMatcher("/api/**", "/", "/index*", "/static/**")
                    .cors(Customizer.withDefaults())//equals to return "(t) -> {}"
                    .csrf(csrf -> csrf.disable())//not good, TODO someday =)
                    .securityContext(context -> context.requireExplicitSave(false)) // 💥 IMPORTANT by default in Spting 6 it set to true. If you set it to false - spring will save credentials to context automaticaly
                    .authorizeHttpRequests(request -> request
                            .requestMatchers(HttpMethod.POST, "/api/login").permitAll()
                            .requestMatchers("/api/test_user").permitAll()
                            .requestMatchers("/api/telegram/test").permitAll()
                            .requestMatchers("/api/tg-health").permitAll()
                            .requestMatchers("/api/sign-up").permitAll()
                            .requestMatchers("/api/current_user","/error","/", "/index.html", "/login.html", "/api/login", "/css/**", "/js/**", "/images/**").permitAll()
                            .anyRequest().authenticated()
                    )
                    .logout(logout -> logout
                            .logoutUrl("/api/logout")
                            .logoutSuccessHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK))
                            .invalidateHttpSession(true)
                            .deleteCookies("JSESSIONID")
                    )
                    .addFilterAt(jsonAuthFilter, UsernamePasswordAuthenticationFilter.class)
                    .authenticationProvider(provider)
                    .build();
        }


        //FILTER CHAIN for the TELEGRAM
        @Bean
        @Order(1)
        public SecurityFilterChain telegramChain (
                HttpSecurity http,
                JWTAuthenticationFilter jwtAuthFilter
        )throws Exception {
            return http
                    .securityMatcher("/api/service/**")
                    .csrf(csrf -> csrf.disable()) //why?
                    .sessionManagement(session -> session
                            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                            .sessionAuthenticationStrategy(new NullAuthenticatedSessionStrategy())
                    )
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers("/api/service/auth/login").permitAll()
                            .requestMatchers("/api/service/telegram/test").permitAll()
//                            .requestMatchers(HttpMethod.POST, "/api/service/telegram/validate-code").permitAll()
                            .anyRequest().authenticated()
                    )
                    .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                    .build();
        }
    }
