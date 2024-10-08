package com.laptrinhjavaweb.config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth/assign-responsibility/demo")
public class DemoController {
	@GetMapping
	public ResponseEntity<String> sayHello() {
		return ResponseEntity.ok("Hello form secured endpoint");
	}
	
}
