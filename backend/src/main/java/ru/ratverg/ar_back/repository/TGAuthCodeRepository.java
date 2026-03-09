package ru.ratverg.ar_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.TGAuthCode;

import java.util.List;
import java.util.Optional;

public interface TGAuthCodeRepository extends JpaRepository<TGAuthCode, Integer> {
    Optional<TGAuthCode> findByAuthCodeTemp(String authCodeTemp);

    Optional<TGAuthCode> findByArUser(ARUser arUser);

    //SELECT all Expired codes
    //using JPQL (Java Persistence Query Language)
    @Query("SELECT x FROM TGAuthCode x WHERE x.expiredAt < CURRENT_TIMESTAMP")
    Optional<List<TGAuthCode>> findAllExpiredCodes();
}
