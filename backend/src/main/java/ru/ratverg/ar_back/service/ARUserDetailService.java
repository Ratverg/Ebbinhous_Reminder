package ru.ratverg.ar_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.ARUserDetails;
import ru.ratverg.ar_back.repository.ARUserRepository;

@Service
public class ARUserDetailService implements UserDetailsService {

    private ARUserRepository arUserRepository;

    @Autowired //not really needed, this is done by default, but do it
    public ARUserDetailService(ARUserRepository arUserRepository) {
        this.arUserRepository = arUserRepository;
    }

    //this method will be used by DauAuthenticationProvider
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        ARUser arUser = arUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for name: " + username));
        return new ARUserDetails(arUser);
    }
}
