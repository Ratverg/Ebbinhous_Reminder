package ru.ratverg.ar_back.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ru.ratverg.ar_back.DTO.ARUserRequestDTO;

import java.io.IOException;

public class JsonUsernamePasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    //add object mapper and auth manager
    private final ObjectMapper objectMapper;

    //here we will pass our created ObjectMapper
    public JsonUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager, ObjectMapper objectMapper) {
        super.setAuthenticationManager(authenticationManager); //just add this =)
        this.objectMapper = objectMapper;
    }

    //here we will try to get authentication
    @Override
    public Authentication attemptAuthentication (HttpServletRequest request, HttpServletResponse response) {
        try {

//            if (request.getMethod().equals("POST"))

            //here we will try to "PARSE" request body and try to check are there Username and Password - our DTO
            ARUserRequestDTO arUserRequestDTO = objectMapper.readValue(request.getInputStream(), ARUserRequestDTO.class);
            //creating token object with info from parsed request
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    arUserRequestDTO.getUsername(),
                    arUserRequestDTO.getPassword()
                    );

            //adds additional info to the request, in our case - token
            setDetails(request, token);


            //MAIN IDEA SIMPLE:
            //---
            // we CREATE row UsernamePasswordAuthenticationToken only with UserName and Password
            // Authentication manager do it's magic, authenticate it
            // then we recieve new UsernamePasswordAuthenticationToken with UserDetails + roles + authenticated=true.
            //---
            // how it works INSIDE:
            //-it calls AuthenticationManager.authenticate() search for Authentication provider, it will be DaoAuthenticationProvider
            //-then, DauAuthenticationProvider calls my created ARUserDetailService.loadUserByUsername
            //-gets ARUser object from DB and convert it to UserDetails object
            //- check password from "request" with encoded pass stored in DB  PasswordEncoder.mathes(raw, encoded)
            //- if OK - returns new UsernamePasswordAuthenticationToken with these parameters:
            //✔ authenticated = true
            //✔ principal = UserDetails
            //✔ credentials = null (пароль удалён!!!)
            //✔ authorities = роли из UserDetails
            //✔ additional details (если были)

            //Then in the method of parents it calls SecurityContextHolder.getContext().setAuthentication(authResult);

            return this.getAuthenticationManager().authenticate(token);
        } catch (IOException e) {
            throw new AuthenticationServiceException("Error, while parsing JSON to LOGIN PASSWORD in request: " + e);
        }
    }

}
