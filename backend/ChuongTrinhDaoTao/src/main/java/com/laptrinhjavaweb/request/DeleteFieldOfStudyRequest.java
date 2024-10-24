package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class DeleteFieldOfStudyRequest {
	private Long id;
    private boolean confirm;
}
