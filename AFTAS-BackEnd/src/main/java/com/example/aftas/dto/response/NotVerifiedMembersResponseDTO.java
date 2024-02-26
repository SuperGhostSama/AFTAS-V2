package com.example.aftas.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotVerifiedMembersResponseDTO {
    private Long id;
    private String name;
    private String familyName;
    private String email;
    private boolean isVerified;
}
