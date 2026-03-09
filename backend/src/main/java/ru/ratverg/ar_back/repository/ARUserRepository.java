package ru.ratverg.ar_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ratverg.ar_back.entity.ARUser;

import java.util.Optional;

public interface ARUserRepository extends JpaRepository<ARUser, Integer> {
    Optional<ARUser> findByUsername (String username);
}
