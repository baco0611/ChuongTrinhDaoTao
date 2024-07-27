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
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.converter.TrainingProgramConverter;
import com.laptrinhjavaweb.dto.TrainingProgramDTO;
import com.laptrinhjavaweb.input.CreditsUpdateInput;
import com.laptrinhjavaweb.output.CreditsOutput;
import com.laptrinhjavaweb.output.ItemListOutput;
import com.laptrinhjavaweb.output.SectionAHeaderOutput;
import com.laptrinhjavaweb.output.TrainingProgramOutput;
import com.laptrinhjavaweb.service.ITrainingProgramService;

// TODO: Auto-generated Javadoc
/**
 * The Class ChuongTrinhDaoTaoController.
 * 
 * @author ntvanh
 * @since 2024/01/01
 */
@CrossOrigin
@RestController
public class TrainingProgramController {

	/** The chuong trinh dao tao service. */
	@Autowired
	private ITrainingProgramService trainingProgramService;

	/** The chuong trinh dao tao converter. */
	@Autowired
	private TrainingProgramConverter trainingProgramConverter;

	/**
	 * show CTDT by ID
	 *
	 * @param programId the id chuong trinh
	 * @return the response entity
	 * 
	 */
	@GetMapping(value = "sectionA/{id}")
	public ResponseEntity<Object> showCTDT(@PathVariable("id") Long programId) {

		try {
			TrainingProgramDTO ctdtDTO = trainingProgramService.findbyIdProgram(programId);
			if (ctdtDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				Object jsonData = new Object() {
					public final Long id = ctdtDTO.getProgramId();
					public final TrainingProgramOutput data = trainingProgramConverter.toOutput(ctdtDTO);
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Show header CTDT by ID
	 *
	 * @param idChuongTrinh the id chuong trinh
	 * @return the response entity
	 */
	@GetMapping(value = "sectionHeader/{id}")
	public ResponseEntity<Object> showHeader(@PathVariable("id") Long programId) {

		try {
			TrainingProgramDTO ctdtDTO = trainingProgramService.findbyIdProgram(programId);
			if (ctdtDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				Object jsonData = new Object() {
					public final Long id = ctdtDTO.getProgramId();
					public final SectionAHeaderOutput data = trainingProgramConverter.toOutputSectionAHeader(ctdtDTO);
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Show all credits by IdCTDT
	 *
	 * @param idChuongTrinh the id chuong trinh
	 * @return the response entity
	 */
	@GetMapping(value = "showCredits/{id}")
	public ResponseEntity<Object> showCredits(@PathVariable("id") Long programId) {

		try {
			TrainingProgramDTO ctdtDTO = trainingProgramService.findbyIdProgram(programId);
			if (ctdtDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				Object jsonData = new Object() {
					public final Long id = ctdtDTO.getProgramId();
					public final CreditsOutput data = trainingProgramConverter.toOutputCredits(ctdtDTO);
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Main list.
	 *
	 * @return the response entity
	 */
	// UNFINISHED
	@GetMapping(value = "/mainList")
	public ResponseEntity<Object> mainList() {
		try {
			List<TrainingProgramDTO> lstDTO = trainingProgramService.findAll();
			if (lstDTO == null) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
			} else {
				List<ItemListOutput> lstMain = new ArrayList<ItemListOutput>();
				for (TrainingProgramDTO dto : lstDTO) {
					ItemListOutput item = new ItemListOutput();
					item = trainingProgramConverter.toOutputItemList(dto);
					lstMain.add(item);
				}
				Object jsonData = new Object() {
					public final List<ItemListOutput> data = lstMain;
				};
				return ResponseEntity.ok(jsonData);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Creates the section A.
	 *
	 * @param DTO the dto
	 * @return the response entity
	 */
	@PostMapping(value = "/create_sectionA")
	public ResponseEntity<Object> createSectionA(@RequestBody TrainingProgramDTO DTO) {
		try {
			TrainingProgramDTO ctdtDTO = trainingProgramService.save(DTO);
			Object jsonData = new Object() {
				public final Long id = ctdtDTO.getProgramId();
			};
			return ResponseEntity.ok(jsonData);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	/**
	 * Store update credits.
	 *
	 * @param request the request
	 * @return the response entity
	 */
	// PENDING
	@PostMapping("/update_Credits")
	public ResponseEntity<?> storeUpdateCredits(@RequestBody CreditsUpdateInput request) {
		return null;
	}

}
