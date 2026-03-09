package ru.ratverg.ar_back.entity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table (name="ar_user")
public class ARUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String email;

    //ONE user to MANY notifications
    //mapped by (Notification.arUser) name of the field in Notification entity!!!
    //mapped by - is "who have the foreign key"
    @OneToMany(mappedBy = "arUser", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Notification> notificationList;

    //ONE to ONE
    //mapped by (Notification.arUser) name of the field in TGAuthCode entity!!!
    //mapped by  TGUser.arUser field. ARUser is "who have the foreign key" (i am not owning the key - search for it in other side)
    //orphanRemoval = true, when we do arUser.setTgAuthCode(null) - this will delete thAuthCode, because it becomes orphaned
    @OneToOne (mappedBy = "arUser", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private TGAuthCode tgAuthCode;

    //ONE TO ONE
    @OneToOne(mappedBy = "arUser", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private TGUser tgUser;

    public ARUser(String username, String password, String email, List<Notification> notificationList) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.notificationList = notificationList;
    }

    public ARUser() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Notification> getNotificationList() {
        return notificationList;
    }

    public TGAuthCode getTgAuthCode() {
        return tgAuthCode;
    }

    public void setTgAuthCode(TGAuthCode tgAuthCode) {
        this.tgAuthCode = tgAuthCode;
    }

    public TGUser getTgUser() {
        return tgUser;
    }

    public void setTgUser(TGUser tgUser) {
        this.tgUser = tgUser;
    }

    public void setNotificationList(List<Notification> notificationList) {

        this.notificationList = notificationList;
    }
}
