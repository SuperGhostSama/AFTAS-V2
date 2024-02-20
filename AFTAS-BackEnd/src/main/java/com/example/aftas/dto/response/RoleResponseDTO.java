package com.example.aftas.dto.response;

import com.example.aftas.enums.AuthorityEnum;
import com.example.aftas.model.Authority;
import com.example.aftas.model.Role;

import java.util.List;


public record RoleResponseDTO(
        String name,
        List<String> authorities,
        boolean isDefault
) {
    public static RoleResponseDTO fromRole(Role role){
        return new RoleResponseDTO(
                role.getName(),
                role.getAuthorities().stream().map(Authority::getName).toList(),
                role.isDefault()
        );
    }
}

