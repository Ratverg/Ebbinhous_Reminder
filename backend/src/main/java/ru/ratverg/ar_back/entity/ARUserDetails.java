package ru.ratverg.ar_back.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class ARUserDetails implements UserDetails {

    private ARUser arUser;

    public ARUserDetails(ARUser arUser) {
        this.arUser = arUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("USER"));//temporary just set to user
    }

    @Override
    public String getPassword() {
        return arUser.getPassword(); //getter to get pass
    }

    @Override
    public String getUsername() {
        return arUser.getUsername();//getter for username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; //temporary set to true
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; //temporary set to true
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; //temporary set to true
    }

    @Override
    public boolean isEnabled() {
        return true; //temporary set to true
    }

    public ARUser getARUser() {
        return this.arUser;
    }
}
