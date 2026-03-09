package ru.ratverg.ar_back.DTO;

import java.util.List;

public class NotificationResponseDTO {
    private int id;
    //    private int arUserId;
    private List<DateResponseDTO> dates;
    private String title;
    private String hashTag;
    private String color;
    private int repeated;
    private int repeatNumbers;
    private String attachment;
    private boolean editing;

    public NotificationResponseDTO() {
    }

    public NotificationResponseDTO(int id, List<DateResponseDTO> dates, String title, String hashTag, String color, int repeated, int repeatNumbers, String attachment, boolean editing) {
        this.id = id;
        this.dates = dates;
        this.title = title;
        this.hashTag = hashTag;
        this.color = color;
        this.repeated = repeated;
        this.repeatNumbers = repeatNumbers;
        this.attachment = attachment;
        this.editing = editing;
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

    public List<DateResponseDTO> getDates() {
        return dates;
    }

    public void setDates(List<DateResponseDTO> dates) {
        this.dates = dates;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
