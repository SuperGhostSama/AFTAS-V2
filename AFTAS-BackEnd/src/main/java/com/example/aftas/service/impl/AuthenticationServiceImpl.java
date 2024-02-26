package com.example.aftas.service.impl;

import com.example.aftas.dto.request.AuthenticationRequest;
import com.example.aftas.dto.request.RefreshTokenRequestDTO;
import com.example.aftas.dto.request.RegisterRequest;
import com.example.aftas.dto.response.AuthenticationResponse;
import com.example.aftas.dto.response.RefreshTokenResponseDTO;
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
import java.util.Objects;
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
                .isVerified(false)
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

        // Check if the account is verified
        if (!user.getIsVerified()) {
            // Customize the exception handling for account verification error
            throw new IllegalArgumentException("Account not verified.");
        }

        // Generate access token and refresh token
        var accessToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);

        // Set the refresh token in the Member entity
        user.setRefreshToken(refreshToken);

        // Save the updated Member entity
        userRepository.save(user);

        return AuthenticationResponse.builder()
                .token(accessToken)
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .role(user.getRole())
                .name(user.getName())
                .familyName(user.getFamilyName())
                .build();
    }

    // Custom exception class for account not verified
    class AccountNotVerifiedException extends RuntimeException {
        public AccountNotVerifiedException(String message) {
            super(message);
        }
    }




    private int generateRandomMembershipNumber() {
        Random random = new Random();
        return random.nextInt(1000000) + 1;
    }


    @Override
    public RefreshTokenResponseDTO refreshToken(RefreshTokenRequestDTO refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();

        // Extract username from the refresh token
        String username = jwtService.extractUserName(refreshToken);

        // Find the user by username
        Member user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

        // Verify if the stored refresh token matches the provided one
        if (!Objects.equals(user.getRefreshToken(), refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }

        // Verify if the refresh token is expired
        if (jwtService.isTokenExpired(refreshToken)) {
            throw new RuntimeException("Expired refresh token");
        }

        // Generate a new access token
        String newAccessToken = jwtService.generateToken(user);

        // Expire the old refresh token and generate a new one
        String newRefreshToken = jwtService.generateRefreshToken(user);

        // Update the refresh token in the Member entity
        user.setRefreshToken(newRefreshToken);
        userRepository.save(user);

        // Create and return the response DTO
        return RefreshTokenResponseDTO.builder()
                .accessToken(newAccessToken)
                .refreshToken(newRefreshToken)
                .build();
    }


}