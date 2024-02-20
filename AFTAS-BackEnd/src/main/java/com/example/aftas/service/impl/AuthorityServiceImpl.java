package com.example.aftas.service.impl;

import com.example.aftas.enums.AuthorityEnum;
import com.example.aftas.model.Authority;
import com.example.aftas.repository.AuthorityRepository;
import com.example.aftas.service.AuthorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthorityServiceImpl implements AuthorityService {

    private final AuthorityRepository authorityRepository;

    @Override
    public List<Authority> getAllByName(List<AuthorityEnum> authorities) {
        List<String> usersAuthorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        if (usersAuthorities.contains(AuthorityEnum.VIEW_AUTHORITIES.toString())) {
            return authorityRepository.findAllByName(authorities);
        }
        return null;
    }
    @Override
    public Optional<Authority> getByName(String authorityEnum) {
        return authorityRepository.findByName(String.valueOf(authorityEnum));
    }
    @Override
    public Optional<Authority> getById(Long id) {
        return authorityRepository.findById(id);
    }
}
