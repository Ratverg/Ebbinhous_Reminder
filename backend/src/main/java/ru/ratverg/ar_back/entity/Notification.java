package ru.ratverg.ar_back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    //MANY notifications to ONE ARUser
    //ar_user_id - this is foreign key in the table
    @ManyToOne
    @JoinColumn(name = "ar_user_id")
    @JsonBackReference
    private ARUser arUser;

    //ONE notification to MANY dates
    //fetch = FetchType.EAGER load all when calls for notification for the first time
    //@JsonManagedReference - this field will be ignored during serialization (to solve infinite loop, during serialization problem)
    //🔹 cascade = CascadeType.ALL — чтобы сохранялись/удалялись вместе с Notification
    //🔹 orphanRemoval = true — чтобы JPA реально удаляло детей из БД, если их убрали из списка
    @OneToMany(mappedBy = "notification", cascade = CascadeType.ALL, fetch = FetchType.EAGER,  orphanRemoval = true)
    @JsonManagedReference
    private List<Date> dates;

    private String title;
    private String hashTag;
    private String color;
    private int repeated;
    private int repeatNumbers;
    private String attachment;
    private boolean editing;

    public Notification() {
    }

    public Notification(ARUser arUser, List<Date> dates, String title, String hashTag, String color, int repeated, int repeatNumbers, String attachment, boolean editing) {
        this.arUser = arUser;
        this.dates = dates;
        this.title = title;
        this.hashTag = hashTag;
        this.color = color;
        this.repeated = repeated;
        this.repeatNumbers = repeatNumbers;
        this.attachment = attachment;
        this.editing = editing;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ARUser getArUser() {
        return arUser;
    }

    public void setArUser(ARUser arUser) {
        this.arUser = arUser;
    }

    public List<Date> getDates() {
        return dates;
    }

    public void setDates(List<Date> date) {
        this.dates = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHashTag() {
        return hashTag;
    }

    public void setHashTag(String hashTag) {
        this.hashTag = hashTag;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getRepeated() {
        return repeated;
    }

    public void setRepeated(int repeated) {
        this.repeated = repeated;
    }

    public int getRepeatNumbers() {
        return repeatNumbers;
    }

    public void setRepeatNumbers(int repeatNumbers) {
        this.repeatNumbers = repeatNumbers;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public boolean isEditing() {
        return editing;
    }

    public void setEditing(boolean editing) {
        this.editing = editing;
    }

}
