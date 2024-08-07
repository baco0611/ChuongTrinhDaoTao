package com.laptrinhjavaweb.response;

import lombok.Data;

@Data
public class CreditsResponse {
	private int generalModule;
	
	private int foundationModule;
	
	private int majorFieldModule;
	
	private int supportModule;
	
	private int internshipModule;
	
	private int thesisModule;
	
	private int specializationModule;
}
