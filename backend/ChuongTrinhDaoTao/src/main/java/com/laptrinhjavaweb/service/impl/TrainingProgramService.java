package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.EducationProgramConverter;
import com.laptrinhjavaweb.dto.EducationProgramDTO;
import com.laptrinhjavaweb.dto.PageInformation;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.repository.EducationProgramRepository;
import com.laptrinhjavaweb.response.SearchProgramResponse;
import com.laptrinhjavaweb.service.IEducationProgramService;

@Service
public class TrainingProgramService implements IEducationProgramService {

	@Autowired
	private EducationProgramRepository trainingProgramRepository;

	@Autowired
	private EducationProgramConverter trainingProgramConverter;

	@Override
	public EducationProgramDTO findbyIdProgram(Long programId) throws Exception {
		EducationProgramEntity trainingProgramEntity = trainingProgramRepository.findByProgramId(programId);
		if (trainingProgramEntity == null) {
			return null;
		}
		EducationProgramDTO chuongTrinhDaoTaoDTO = trainingProgramConverter.toDTO(trainingProgramEntity);
		return chuongTrinhDaoTaoDTO;
	}

	@Override
	public EducationProgramDTO save(EducationProgramDTO ctdtDTO) throws Exception {
		EducationProgramEntity ctdtEntity = trainingProgramRepository.save(trainingProgramConverter.toEntity(ctdtDTO));
		return trainingProgramConverter.toDTO(ctdtEntity);
	}

	@Override
	public List<EducationProgramDTO> findAll() {
		List<EducationProgramDTO> lstDTO = new ArrayList<EducationProgramDTO>();
		List<EducationProgramEntity> lstEntity = trainingProgramRepository.findAll();
		for (EducationProgramEntity trainingProgramEntity : lstEntity) {
			EducationProgramDTO dto = new EducationProgramDTO();
			dto = trainingProgramConverter.toDTO(trainingProgramEntity);
			lstDTO.add(dto);
		}
		return lstDTO;
	}

	public SearchProgramResponse searchPrograms(String keyword, String department, int pageSize, int pageOrder) {
        PageRequest pageRequest = PageRequest.of(pageOrder - 1, pageSize);
        Page<EducationProgramEntity> programPage = trainingProgramRepository.searchPrograms(keyword, department, pageRequest);

        SearchProgramResponse responseWrapper = SearchProgramResponse.builder()
                .data(programPage.getContent().stream()
                        .map(trainingProgramConverter::convertToDTO)
                        .collect(Collectors.toList()))
                		.pageInformation(new PageInformation(
                        programPage.getNumberOfElements(),
                        pageSize,
                        programPage.getPageable().getOffset(),
                        programPage.isFirst(),
                        programPage.isLast(),
                        pageOrder,
                        programPage.getTotalPages(),
                        (int) programPage.getTotalElements()
                ))
                .status(200)
                .build();

        return responseWrapper;
    }
	
	public SearchProgramResponse managePrograms(String keyword, String department, String lecturerCode, int pageSize, int pageOrder) {
	    // Tạo PageRequest với số trang và kích thước trang
	    PageRequest pageRequest = PageRequest.of(pageOrder - 1, pageSize);
	    
	    // Lấy thông tin về người dùng hiện tại từ SecurityContext
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String currentLecturerCode = authentication.getName(); // Mã giảng viên hiện tại

	    // Xác định vai trò của người dùng
	    boolean isDeleteProgram = authentication.getAuthorities().stream()
	            .anyMatch(auth -> auth.getAuthority().equals("DELETE_PROGRAM"));
	    boolean isAssignResponsibility = authentication.getAuthorities().stream()
	            .anyMatch(auth -> auth.getAuthority().equals("ASSIGN_RESPONSIBILITY"));
	    boolean isAdmin = authentication.getAuthorities().stream()
	            .anyMatch(auth -> auth.getAuthority().equals("ADMIN"));
	    boolean isUser = authentication.getAuthorities().stream()
	            .anyMatch(auth -> auth.getAuthority().equals("USER"));

	    // Xây dựng điều kiện tìm kiếm dựa trên quyền của người dùng
	    Page<EducationProgramEntity> programPage;

	    if (isAdmin) {
	        // Admin có quyền xem tất cả các chương trình đào tạo
	        programPage = trainingProgramRepository.managePrograms(keyword, department, lecturerCode, pageRequest);
	    } else if (isDeleteProgram || isAssignResponsibility) {
	        // DeleteProgram và AssignResponsibility có quyền xem tất cả nhưng có thể lọc theo lecturerCode
	        programPage = trainingProgramRepository.managePrograms(keyword, department, lecturerCode, pageRequest);
	    } else {
	    	Page<EducationProgramEntity> programPage1 = trainingProgramRepository.findAllByLecturerIdAndFilter(keyword, department, currentLecturerCode, pageRequest);
	    	Page<EducationProgramEntity> programPage2 = trainingProgramRepository.findByLecturersCode(keyword, department, currentLecturerCode, pageRequest);
	    	// So sánh số lượng phần tử trong hai trang và chọn cái có nhiều phần tử hơn
	        if (programPage1.getTotalElements() > programPage2.getTotalElements()) {
	            programPage = programPage1;
	        } else {
	            programPage = programPage2;
	        }
	    }

	    // Tạo đối tượng Response với dữ liệu và thông tin phân trang
	    SearchProgramResponse responseWrapper = SearchProgramResponse.builder()
	            .data(programPage.getContent().stream()
	                    .map(trainingProgramConverter::convertToDTO)
	                    .collect(Collectors.toList()))
	            .pageInformation(new PageInformation(
	                programPage.getNumberOfElements(),
	                pageSize,
	                programPage.getPageable().getOffset(),
	                programPage.isFirst(),
	                programPage.isLast(),
	                pageOrder,
	                programPage.getTotalPages(),
	                (int) programPage.getTotalElements()
	            ))
	            .status(200)
	            .build();

	    return responseWrapper;
	}

}
