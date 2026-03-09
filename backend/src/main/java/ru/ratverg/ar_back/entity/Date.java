package ru.ratverg.ar_back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "date")
public class Date {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //MANY dates to ONE notification
    //notification_id - fk
    @ManyToOne
    @JoinColumn (name = "notification_id")
    @JsonBackReference
    private Notification notification;

//    @JsonFormat (pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX", timezone = "UTC")
    private Instant repeatDate;
    private Instant sentAt;
    private String status;

    public Date(Notification notification, Instant repeatDate, Instant sentAt, String status) {
        this.notification = notification;
        this.repeatDate = repeatDate;
        this.sentAt = sentAt;
        this.status = status;
    }


    public Date() {
    }

    public Notification getNotification() {
        return notification;
    }

    public void setNotification(Notification notification) {
        this.notification = notification;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Instant getRepeatDate() {
        return repeatDate;
    }

    public void setRepeatDate(Instant repeatDate) {
        this.repeatDate = repeatDate;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public void setSentAt(Instant sentAt) {
        this.sentAt = sentAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}
