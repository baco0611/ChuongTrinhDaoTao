package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class LecturersInfoRequest {
	private String keyword;
	private String department;
	private int pageOrder;
}
