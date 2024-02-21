package com.example.aftas.dto.response;

import com.example.aftas.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse{
    private String token;
    private String name;
    private String familyName;
    private String email;
    private Role role;
}
