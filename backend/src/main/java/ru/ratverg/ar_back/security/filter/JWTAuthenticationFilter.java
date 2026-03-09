package ru.ratverg.ar_back.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import ru.ratverg.ar_back.DTO.JWTprincipals;
import ru.ratverg.ar_back.service.JWTMainService;

import java.io.IOException;
import java.util.List;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private JWTMainService jwtMainService;

    @Autowired
    public JWTAuthenticationFilter(JWTMainService jwtMainService) {
        this.jwtMainService = jwtMainService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
//        System.out.println(request.getRequestURI());
//        request.getHeaderNames().asIterator().forEachRemaining(x-> System.out.println(x));
//        System.out.println(request.getHeader("authorization"));
//        System.out.println(request.getRequestURI());
        String authHeader = request.getHeader("Authorization");

        //If there is NO JWT TOKEN - just continue filter chain
        if (authHeader == null || !authHeader.startsWith("Bearer")){
            filterChain.doFilter(request, response);
            return;
        }

        //if there IS JWT TOKEN
        if (authHeader != null && authHeader.startsWith("Bearer")) {
            String token = authHeader.substring(7);
            JWTprincipals jwtPrincipals = jwtMainService.validate(token);

            //create AUTH TOKEN for authContext
            if (jwtPrincipals != null) {
                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                jwtPrincipals, //"telegram", "ROLE_SERVICE"
                                null,
                                List.of(new SimpleGrantedAuthority(jwtPrincipals.getRoles()))//"ROLE_SERVICE"
                        );
                //save AUTHENTICATION object with PAYLOAD to the SECURITY CONTEXT
                SecurityContextHolder.getContext().setAuthentication(auth);
                JWTprincipals jwTprincipals = (JWTprincipals) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                System.out.println("securityContext subject: " + jwTprincipals.getSubject());
            }
        }
        filterChain.doFilter(request, response);
    }
}
