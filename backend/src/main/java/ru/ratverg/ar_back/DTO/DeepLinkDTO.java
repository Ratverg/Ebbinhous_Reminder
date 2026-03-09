package ru.ratverg.ar_back.DTO;

public class DeepLinkDTO {
    private String link;

    public DeepLinkDTO(String link) {
        this.link = link;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
