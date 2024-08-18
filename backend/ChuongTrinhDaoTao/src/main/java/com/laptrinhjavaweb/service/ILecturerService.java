package com.laptrinhjavaweb.service;

import com.laptrinhjavaweb.response.SearchLecturersResponse;

public interface ILecturerService {
	SearchLecturersResponse searchLecturers(String keyword, String department, int pageSize, int pageOrder);
}
