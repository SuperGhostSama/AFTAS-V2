package com.example.aftas.dto.request;

import com.example.aftas.enums.IdentityDocumentType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String name;
    private String familyName;
    private LocalDate accessDate;
    private String nationality;
    private String email;
    private IdentityDocumentType identityDocumentType;
    private String identityNumber;
    private String password;
    private int membershipNumber;
    private Boolean isVerified;

}