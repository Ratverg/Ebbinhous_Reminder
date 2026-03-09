package ru.ratverg.ar_back.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import ru.ratverg.ar_back.DTO.ARUserMapper;
import ru.ratverg.ar_back.DTO.ARUserRequestDTO;
import ru.ratverg.ar_back.DTO.ARUserResponseDTO;
import ru.ratverg.ar_back.DTO.DeepLinkDTO;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.ARUserDetails;
import ru.ratverg.ar_back.entity.TGAuthCode;
import ru.ratverg.ar_back.entity.TGUser;
import ru.ratverg.ar_back.service.ARUserServiceImpl;
import ru.ratverg.ar_back.service.TGBotServiceIml;
import ru.ratverg.ar_back.service.TGTempCodeServiceImpl;
import ru.ratverg.ar_back.service.TGUserServiceImpl;

import java.util.List;

@RestController // Marks this class as a REST controller (JSON responses)
@RequestMapping("/api") // All endpoints will start with /api
public class UserController {

    //inject ARUserServiceImplementation for user-related buisiness logic
    private ARUserServiceImpl arUserService;
    private ARUserMapper arUserMapper;
    private TGTempCodeServiceImpl tgTempCodeService;
    private TGUserServiceImpl tgUserService;
    private TGBotServiceIml tgBotService;
    @Autowired
    public UserController(ARUserServiceImpl arUserService, ARUserMapper arUserMapper, TGTempCodeServiceImpl tgTempCodeService, TGUserServiceImpl tgUserService, TGBotServiceIml tgBotService) {
        this.arUserService = arUserService;
        this.arUserMapper = arUserMapper;
        this.tgTempCodeService = tgTempCodeService;
        this.tgUserService = tgUserService;
        this.tgBotService = tgBotService;
    }

    //END point to get all ARUsers al a List of ARUser objects
    @GetMapping("/users")
    public List<ARUser> getAllARUsers(){
        return arUserService.findAll();
    }

    //This is test endpoint, returns String "Hello, Rat!" when call endPoint /api/hello
    @GetMapping("/hello")
    public String helloUser(){
        return "Hello, Rat!";
    }

    //create new user
    //@RequestBody parses this POST body request to ARUserRequestDTO object
    @PostMapping("/users")
    public ARUserResponseDTO addARUser(@RequestBody ARUserRequestDTO arUserRequestDTO) {
        System.out.println("DTO: " + arUserRequestDTO.getUsername() + " password: " + arUserRequestDTO.getPassword());
        return arUserService.saveARUser(arUserRequestDTO);
    }

    // Endpoint to get currently authenticated user
    @GetMapping("/current_user")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal ARUserDetails arUserDetails) {
        // If no user is authenticated, return 403 FORBIDDEN
        if (arUserDetails == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        // Return the authenticated user's entity converted to DTO
        ARUserResponseDTO arUserResponseDTO = arUserMapper.toDTO(arUserDetails.getARUser());
        return ResponseEntity.ok(arUserResponseDTO);
    }

    @GetMapping("/current-tg-user-info")
    public ResponseEntity<?> getTGUserInfo(@AuthenticationPrincipal ARUserDetails arUserDetails) {
        return tgUserService.getTGUserInfoForCurrentUser(arUserDetails);
    }


    //EndPoint to generate temp code
    @GetMapping("/generate-temp-code")
    public TGAuthCode generateTempCode (@AuthenticationPrincipal ARUserDetails arUserDetails){
        if (arUserDetails == null) {
            throw new IllegalStateException("User is not authenticated, @AuthenticationPrincipal is null");
        }
        ARUser  arUser = arUserDetails.getARUser();
        return tgTempCodeService.generateNewCode(arUser, 0, 0);
    }

    @GetMapping("/generate-deep-link")
    public ResponseEntity<?> generateDeepLink(@AuthenticationPrincipal ARUserDetails arUserDetails) {
        if (arUserDetails == null) {
            throw new IllegalStateException("User not authenticated, @AuthenticationPrincipal is null");
        }
        ARUser arUser = arUserDetails.getARUser();
        //create new tgTempCode object in DB with TG id = 0, chatId=0 and get it's temp code String (like "ADFDF")
        String newTempCode = tgTempCodeService.generateNewCode(arUser, 0,0).getAuthCodeTemp();
        //create TG deep link like https://t.me/my_auth_bot?start=auth_f83k29x
        String newDeepLinkString = ("https://t.me/Ebbinghaus_Reminder_main_bot?start=" + newTempCode);
        DeepLinkDTO deepLinkDTO = new DeepLinkDTO(newDeepLinkString);
        return ResponseEntity.ok(deepLinkDTO);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> createNewUser(@Valid @RequestBody ARUserRequestDTO arUserRequestDTO) {
        return ResponseEntity.ok(arUserService.saveARUser(arUserRequestDTO));
    }

    @GetMapping("/get-current-tg-user")
    public ResponseEntity<?> getTgUser(@AuthenticationPrincipal ARUserDetails arUserDetails) {
        if (arUserDetails == null) {
            throw new IllegalStateException("User not authenticated, @AuthenticationPrincipal is null");
        }
        ARUser arUser = arUserDetails.getARUser();
        return tgUserService.getTGUserInfoByArUser(arUser);
    }

    @GetMapping("/tg-health")
    public ResponseEntity<?> getTgHealth() {
        return ResponseEntity.ok(tgBotService.getTGHealthStatus());
    }

    @DeleteMapping("/delete-current-tg-user")
    public ResponseEntity<?> deleteCurrentTGUser(@AuthenticationPrincipal ARUserDetails arUserDetails) {
        if (arUserDetails == null) {
            throw new IllegalStateException("User not authenticated, @AuthenticationPrincipal is null");
        }
        ARUser arUser = arUserDetails.getARUser();
        TGUser deletedTGUser = tgUserService.deleteByARUserId(arUser.getId());
        return ResponseEntity.ok(deletedTGUser);
    }


}
