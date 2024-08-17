package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class ManageProgramRequest {
	private String keyword;
	private String department;
	private int pageSize;
	private int pageOrder;
}
