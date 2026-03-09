package ru.ratverg.ar_back.repository;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.Notification;

import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findNotificationsByArUser(ARUser arUser);

    //this will block request for current transaction, till transaction is over
    //"SELECT ... FOR UPDATE"
    // "Notification n" is like "n = Notification" !!! Do not forget about it
    //":id" is passed from @Param("id")
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT n FROM Notification n WHERE n.id = :id")
    Optional<Notification> findByIdWIthBLock(@Param("id") int id);
}
