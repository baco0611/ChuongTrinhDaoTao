package com.laptrinhjavaweb.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateDepartmentManagerRequest {
	private Long id;
    private Long lecturerId;
}
