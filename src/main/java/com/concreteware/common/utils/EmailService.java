package com.concreteware.common.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendNewUserEmail(String to, String password, String tipoUsuario) {
        String subject = "Bienvenido a ConcreteWare";
        String text = "Hola,\n\n" +
                "Tu cuenta de usuario tipo " + tipoUsuario + " ha sido creada en ConcreteWare.\n" +
                "Puedes iniciar sesión con tu correo y la siguiente contraseña temporal:\n\n" +
                "Contraseña: " + password + "\n\n" +
                "Por favor, cambia tu contraseña después de iniciar sesión.\n\n" +
                "Saludos,\nEquipo ConcreteWare";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }
} 