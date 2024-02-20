package com.example.aftas.service;

import com.example.aftas.dto.request.AuthenticationRequest;
import com.example.aftas.dto.request.RegisterRequest;
import com.example.aftas.dto.response.AuthenticationResponse;
import org.springframework.stereotype.Component;


public interface AuthenticationService {

    AuthenticationResponse register(RegisterRequest user);

    AuthenticationResponse authenticate(AuthenticationRequest user);

}

