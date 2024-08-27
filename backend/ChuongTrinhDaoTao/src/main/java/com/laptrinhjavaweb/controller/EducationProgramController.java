package com.laptrinhjavaweb.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.request.CreditsUpdateRequest;
import com.laptrinhjavaweb.request.ManageProgramRequest;
import com.laptrinhjavaweb.request.SearchProgramRequest;
import com.laptrinhjavaweb.request.ValidateInformationRequest;
import com.laptrinhjavaweb.response.CreditsResponse;
import com.laptrinhjavaweb.response.ItemListResponse;
import com.laptrinhjavaweb.response.SearchProgramResponse;
import com.laptrinhjavaweb.response.SectionAHeaderResponse;
import com.laptrinhjavaweb.response.SectionHeaderResponse;
import com.laptrinhjavaweb.response.TrainingProgramResponse;
import com.laptrinhjavaweb.service.IEducationProgramService;
import com.laptrinhjavaweb.service.ILecturerService;

import jakarta.persistence.EntityNotFoundException;

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
	
	@Autowired
	private ILecturerService lecturersService;

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
	public ResponseEntity<SectionHeaderResponse> showHeader(@PathVariable("id") Long programId) {
	    try {
	        EducationProgramDTO ctdtDTO = trainingProgramService.findbyIdProgram(programId);

	        if (ctdtDTO == null) {
	            // Tạo response với lỗi
	            SectionHeaderResponse errorResponse = new SectionHeaderResponse();
	            errorResponse.setData(null);
	            errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	        } else {
	            // Tạo đối tượng SectionHeaderResponse với dữ liệu từ DTO
	            SectionAHeaderResponse headerResponse = new SectionAHeaderResponse();
	            headerResponse.setId(ctdtDTO.getProgramId());
	            headerResponse.setProgramCode(ctdtDTO.getProgramCode());
	            headerResponse.setVersion(ctdtDTO.getVersion()); 
	            headerResponse.setFieldName(ctdtDTO.getFieldName());

	            // Tạo response thành công
	            SectionHeaderResponse successResponse = new SectionHeaderResponse();
	            successResponse.setData(headerResponse);
	            successResponse.setStatus(HttpStatus.OK.value());

	            return ResponseEntity.ok(successResponse);
	        }
	    } catch (Exception e) {
	        e.printStackTrace();
	        // Xử lý lỗi
	        SectionHeaderResponse errorResponse = new SectionHeaderResponse();
	        errorResponse.setData(null);
	        errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
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
			SearchProgramResponse response = trainingProgramService.searchPrograms(searchRequest.getKeyword(),
					searchRequest.getDepartment(), searchRequest.getStatus(), searchRequest.getPageSize(),
					searchRequest.getPageOrder());

			// Trả về phản hồi thành công với dữ liệu
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			e.printStackTrace();

			// Xử lý lỗi và trả về phản hồi lỗi với mã trạng thái 500 (Internal Server
			// Error)
			SearchProgramResponse errorResponse = SearchProgramResponse.builder()
					.status(HttpStatus.INTERNAL_SERVER_ERROR.value()) // Trạng thái HTTP 500
					.build();

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
	}

	@PostMapping("/manage")
	public ResponseEntity<SearchProgramResponse> managePrograms(@RequestBody ManageProgramRequest manageRequest) {
		try {
			// Gọi phương thức service để thực hiện các chức năng tìm kiếm và phân trang
			SearchProgramResponse response = trainingProgramService.managePrograms(manageRequest.getKeyword(),
					manageRequest.getDepartment(), manageRequest.getStatus(), manageRequest.getPageSize(),
					manageRequest.getPageOrder());

			// Trả về phản hồi thành công với dữ liệu
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			e.printStackTrace();

			// Xử lý lỗi và trả về phản hồi lỗi với mã trạng thái 500 (Internal Server
			// Error)
			SearchProgramResponse errorResponse = SearchProgramResponse.builder()
					.status(HttpStatus.INTERNAL_SERVER_ERROR.value()) // Trạng thái HTTP 500
					.build();

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
	}
	
	//Authen update education program
	@PostMapping("/validateProgramAccess")
	public ResponseEntity<?> validateProgramAccess(@RequestBody ValidateInformationRequest request) {
	    try {
	        // Kiểm tra nếu các trường không phải là null
	        if (request.getLecturerCode() == null || request.getProgramId() == null) {
	            Map<String, Object> response = new HashMap<>();
	            response.put("status", HttpStatus.FORBIDDEN.value());
	            response.put("message", "KHÔNG THỂ XÁC MINH QUYỀN TRUY CẬP");
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	        }

	        // Lấy giảng viên và chương trình từ dịch vụ
	        LecturersEntity lecturer = lecturersService.findByLecturerCode(request.getLecturerCode());
	        EducationProgramEntity program = trainingProgramService.findById(request.getProgramId());

	        // Kiểm tra xem giảng viên và chương trình có tồn tại không
	        if (lecturer == null || program == null) {
	            Map<String, Object> response = new HashMap<>();
	            response.put("status", HttpStatus.FORBIDDEN.value());
	            response.put("message", "KHÔNG THỂ XÁC MINH QUYỀN TRUY CẬP");
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	        }

	        // Kiểm tra nếu giảng viên không phải là người được phân công
	        if (!program.getLecturer().getLecturersId().equals(lecturer.getLecturersId())) {
	            Map<String, Object> response = new HashMap<>();
	            response.put("status", HttpStatus.FORBIDDEN.value());
	            response.put("message", "NGƯỜI DÙNG KHÔNG ĐƯỢC CẤP QUYỀN TRUY CẬP");
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	        }

	        // Kiểm tra trạng thái của chương trình không phải ĐANG THỰC HIỆN (2)
	        if (!program.getStatus().equals(2)) {
	            Map<String, Object> response = new HashMap<>();
	            response.put("status", HttpStatus.FORBIDDEN.value());
	            response.put("message", "CHƯƠNG TRÌNH KHÔNG THỂ CHỈNH SỬA");
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	        }

	        // Nếu tất cả đều đúng, trả về trạng thái 200 với message "OKE"
	        Map<String, Object> response = new HashMap<>();
	        response.put("status", HttpStatus.OK.value());
	        response.put("message", "OKE");
	        return ResponseEntity.ok(response);

	    } catch (EntityNotFoundException e) {
	        Map<String, Object> response = new HashMap<>();
	        response.put("status", HttpStatus.FORBIDDEN.value());
	        response.put("message", e.getMessage());
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	    } catch (Exception e) {
	        e.printStackTrace();
	        Map<String, Object> response = new HashMap<>();
	        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
	        response.put("message", "Đã xảy ra lỗi khi kiểm tra quyền truy cập.");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}


}
