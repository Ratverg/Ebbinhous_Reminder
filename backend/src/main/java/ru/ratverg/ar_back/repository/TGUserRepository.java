package ru.ratverg.ar_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.TGUser;

import java.util.List;
import java.util.Optional;

public interface TGUserRepository extends JpaRepository<TGUser, Integer> {
    Optional<TGUser> findByArUser(ARUser arUser);
    Optional<TGUser> findByTelegramId(int telegramId);
    Optional<List<TGUser>> findAllByTelegramId(int telegramId);

}
