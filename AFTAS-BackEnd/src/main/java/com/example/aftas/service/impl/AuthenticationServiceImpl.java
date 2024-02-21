package com.example.aftas.service.impl;

import com.example.aftas.dto.request.AuthenticationRequest;
import com.example.aftas.dto.request.RegisterRequest;
import com.example.aftas.dto.response.AuthenticationResponse;
import com.example.aftas.model.Member;
import com.example.aftas.repository.MemberRepository;
import com.example.aftas.security.JwtService;
import com.example.aftas.service.AuthenticationService;
import com.example.aftas.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final MemberRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleService roleService;


    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists. Please choose a different email.");
        }

        // Check if membership number already exists
        if (userRepository.existsByMembershipNumber(request.getMembershipNumber())) {
            throw new RuntimeException("Membership number already exists. Please choose a different membership number.");
        }

        // Generate a random membership number and check for uniqueness
        int randomMembershipNumber;
        do {
            randomMembershipNumber = generateRandomMembershipNumber();
        } while (userRepository.existsByMembershipNumber(randomMembershipNumber));

        LocalDate accessDate = java.time.LocalDate.now();

        var user = Member.builder()
                .name(request.getName())
                .familyName(request.getFamilyName())
                .nationality(request.getNationality())
                .identityDocumentType(request.getIdentityDocumentType())
                .identityNumber(request.getIdentityNumber())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(roleService.findDefaultRole().orElse(null))
                .membershipNumber(randomMembershipNumber)
                .accessDate(accessDate)
                .build();

        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole())
                .name(user.getName())
                .familyName(user.getFamilyName())
                .build();
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .role(user.getRole())
                .name(user.getName())
                .familyName(user.getFamilyName())
                .build();
    }


    private int generateRandomMembershipNumber() {
        Random random = new Random();
        return random.nextInt(1000000) + 1;
    }

}