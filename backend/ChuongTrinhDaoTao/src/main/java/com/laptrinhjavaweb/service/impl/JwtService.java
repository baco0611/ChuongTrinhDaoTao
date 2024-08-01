package com.laptrinhjavaweb.service.impl;

import java.security.Key;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	private static final String SECRET_KEY = "sS5Pz1R8GQd5Ffh5j3YtFbXhLX8ySqeQrZXGJ3qXtC0=";

	public String extractLecturersCode(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	public String generateToken(UserDetails userDetails) {
		return generateToken(new HashMap<>(), userDetails);
	}

	// Phương thức chuyển đổi LocalDateTime thành Date
	private Date convertToDate(LocalDateTime localDateTime) {
	    Instant instant = localDateTime.atZone(ZoneId.systemDefault()).toInstant();
	    return Date.from(instant);
	}

//    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
//        return Jwts
//                .builder()
//                .setClaims(extractClaims)
//                .setSubject(userDetails.getUsername())
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 giờ
//                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
//                .compact();
//    }

	 // Phương thức tạo JWT Token
    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
        // Lấy thời gian hiện tại
        LocalDateTime now = LocalDateTime.now();

        // Tạo Date cho issuedAt và expiration
        Date issuedAt = convertToDate(now);
        LocalDateTime expirationTime = now.plus(Duration.ofHours(24));
        Date expiration = convertToDate(expirationTime);

        return Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

	public boolean isTokenValid(String token, UserDetails userDetails) {
		final String username = extractLecturersCode(token);
		return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
	}

	private Key getSignInKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}
}
