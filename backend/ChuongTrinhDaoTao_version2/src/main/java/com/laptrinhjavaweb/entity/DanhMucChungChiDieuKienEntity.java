package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name="danhMucChungChiDieuKien")
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
