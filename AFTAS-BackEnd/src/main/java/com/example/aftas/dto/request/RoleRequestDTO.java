package com.example.aftas.dto.request;

import com.example.aftas.model.Authority;
import com.example.aftas.model.Role;

import java.util.List;

public record RoleRequestDTO(
        String name,
        List<Authority> authorities,
        boolean isDefault
){
    public Role toRole(){
        return Role.builder()
                .name(name)
                .isDefault(isDefault)
                .authorities(authorities)
                .build();
    }
}