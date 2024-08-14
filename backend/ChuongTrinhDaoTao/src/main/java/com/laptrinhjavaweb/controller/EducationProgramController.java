package com.laptrinhjavaweb.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.converter.EducationProgramConverter;
import com.laptrinhjavaweb.dto.EducationProgramDTO;
import com.laptrinhjavaweb.request.CreditsUpdateRequest;
import com.laptrinhjavaweb.request.SearchProgramRequest;
import com.laptrinhjavaweb.response.CreditsResponse;
import com.laptrinhjavaweb.response.ItemListResponse;
import com.laptrinhjavaweb.response.SearchProgramResponse;
import com.laptrinhjavaweb.response.SectionAHeaderResponse;
import com.laptrinhjavaweb.response.TrainingProgramResponse;
import com.laptrinhjavaweb.service.IEducationProgramService;

// TODO: Auto-generated Javadoc
/**
 * The Class ChuongTrinhDaoTaoController.
 * 
 * @author ntvanh
 * @since 2024/01/01
 */
@CrossOrigin
@RestController
@RequestMapping("/api/education-programs")
public class EducationProgramController {

	@Autowired
	private IEducationProgramService trainingProgramService;

	@Autowired
	private EducationProgramConverter trainingProgramConverter;

	@GetMapping(value = "sectionA/{id}")
	public ResponseEntity<Object> showCTDT(@PathVariable("id") Long programId) {

		try {
			EducationProgramDTO ctdtDTO = trainingProgramService.findbyIdProgram(programId);
			if (ctdtDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				Object jsonData = new Object() {
					public final Long id = ctdtDTO.getProgramId();
					public final TrainingProgramResponse data = trainingProgramConverter.toOutput(ctdtDTO);
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping(value = "sectionHeader/{id}")
	public ResponseEntity<Object> showHeader(@PathVariable("id") Long programId) {

		try {
			EducationProgramDTO ctdtDTO = trainingProgramService.findbyIdProgram(programId);
			if (ctdtDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				Object jsonData = new Object() {
					public final Long id = ctdtDTO.getProgramId();
					public final SectionAHeaderResponse data = trainingProgramConverter.toOutputSectionAHeader(ctdtDTO);
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@GetMapping(value = "showCredits/{id}")
	public ResponseEntity<Object> showCredits(@PathVariable("id") Long programId) {

		try {
			EducationProgramDTO ctdtDTO = trainingProgramService.findbyIdProgram(programId);
			if (ctdtDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				Object jsonData = new Object() {
					public final Long id = ctdtDTO.getProgramId();
					public final CreditsResponse data = trainingProgramConverter.toOutputCredits(ctdtDTO);
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	// UNFINISHED
	@GetMapping(value = "/mainList")
	public ResponseEntity<Object> mainList() {
		try {
			List<EducationProgramDTO> lstDTO = trainingProgramService.findAll();
			if (lstDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				List<ItemListResponse> lstMain = new ArrayList<ItemListResponse>();
				for (EducationProgramDTO dto : lstDTO) {
					ItemListResponse item = new ItemListResponse();
					item = trainingProgramConverter.toOutputItemList(dto);
					lstMain.add(item);
				}
				Object jsonData = new Object() {
					public final List<ItemListResponse> data = lstMain;
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	@PostMapping(value = "/create_sectionA")
	public ResponseEntity<Object> createSectionA(@RequestBody EducationProgramDTO DTO) {
		try {
			EducationProgramDTO ctdtDTO = trainingProgramService.save(DTO);
			Object jsonData = new Object() {
				public final Long id = ctdtDTO.getProgramId();
			};
			return ResponseEntity.ok(jsonData);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	// PENDING
	@PostMapping("/update_Credits")
	public ResponseEntity<?> storeUpdateCredits(@RequestBody CreditsUpdateRequest request) {
		return null;
	}

	@PostMapping("/search")
	public ResponseEntity<SearchProgramResponse> searchPrograms(@RequestBody SearchProgramRequest searchRequest) {
	    try {
	        // Thực hiện tìm kiếm và thu thập dữ liệu dựa trên searchRequest
	        SearchProgramResponse response = trainingProgramService.searchPrograms(
	                searchRequest.getKeyword(), searchRequest.getDepartment(), searchRequest.getPageSize(),
	                searchRequest.getPageOrder());

	        // Trả về phản hồi thành công với dữ liệu
	        return ResponseEntity.ok(response);

	    } catch (Exception e) {
	        e.printStackTrace();

	        // Xử lý lỗi và trả về phản hồi lỗi với mã trạng thái 500 (Internal Server Error)
	        SearchProgramResponse errorResponse = SearchProgramResponse.builder()
	                .status(HttpStatus.INTERNAL_SERVER_ERROR.value()) // Trạng thái HTTP 500
	                .build();

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	    }
	}


}
