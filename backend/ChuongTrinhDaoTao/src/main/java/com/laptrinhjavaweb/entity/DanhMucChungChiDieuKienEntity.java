package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name="DanhMucChungChiDieuKien")
@Data
public class DanhMucChungChiDieuKienEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idChuongChi;
	
	@Column(length = 500)
	private String tenChungChi;
	
	@ManyToMany(mappedBy = "lstChungChi")
	private List<ChuongTrinhChiTietEntity> lstChuongTrinhChiTiet = new ArrayList<ChuongTrinhChiTietEntity>();

	@OneToMany(mappedBy = "idChungChi")
	private List<MaTran_ChungChi_ChuanDauRaEntity> lstChuanDauRa= new ArrayList<MaTran_ChungChi_ChuanDauRaEntity>();
}
