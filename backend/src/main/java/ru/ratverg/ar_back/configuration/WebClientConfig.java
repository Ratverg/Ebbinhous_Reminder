package ru.ratverg.ar_back.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.HttpProtocol;
import reactor.netty.http.client.HttpClient;
import ru.ratverg.ar_back.provider.TokenProvider;

import java.time.Duration;


@Configuration
public class WebClientConfig {
    private TokenProvider tokenProvider;

    @Autowired
    public WebClientConfig(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    //for get post requests and others
    @Bean
    public WebClient webClient() {
        // We create client who can only send HTTP 1.1
        // This will garantee that there are will not be any "upgrade" headers)
        HttpClient httpClient = HttpClient.create()
                .protocol(HttpProtocol.HTTP11)
                .responseTimeout(Duration.ofMillis(1000));

        //create webClient with HTTP 1.1 protocol and filter, that adds JWT token
        return WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .filter(addJWTFilter(tokenProvider))
                .build();
    }

    //We will create custom filter, that adds JWT token to every request
    //ExchangeFilterFunction - is functional interface
    private ExchangeFilterFunction addJWTFilter(TokenProvider tokenProvider) {
        return (request, next) -> {
            String token = tokenProvider.getToken();
            ClientRequest newRequest = ClientRequest.from(request)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .build();
            return next.exchange(newRequest);
        };
    }

}
