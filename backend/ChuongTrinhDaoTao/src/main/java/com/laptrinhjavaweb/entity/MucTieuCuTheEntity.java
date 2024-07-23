package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table (name = "MucTieuCuThe")
@Data
public class MucTieuCuTheEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMucTieu;
	
	@Column(length = 50)
	private String kiHieu;
	
	@Column(columnDefinition = "TEXT")
	private String noiDung;
	
	@Column
	private String loaiMucTieu;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
	
	@OneToMany(mappedBy = "idMucTieu")
	private List<MaTran_ChuanDauRa_MucTieuEntity> lstChuanDauRa = new ArrayList<MaTran_ChuanDauRa_MucTieuEntity>();
}
