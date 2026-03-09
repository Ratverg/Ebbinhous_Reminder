package ru.ratverg.ar_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.ratverg.ar_back.entity.ServiceAccount;

public interface SARepository extends JpaRepository<ServiceAccount, Integer> {
    ServiceAccount findByServiceName (String serviceName);
}
