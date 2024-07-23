package com.laptrinhjavaweb.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="MaTranHocPhanChuanDauRa")
@Data
public class MaTran_HocPhan_ChuanDauRaEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idMaTran;
	
	@Column
	private int mucDoDapUng;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinhChiTiet")
	private ChuongTrinhChiTietEntity idChuongTrinhChiTiet;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuanDauRa")
	private ChuanDauRaEntity idChuanDauRa;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="idChuongTrinh")
	private ChuongTrinhDaoTaoEntity idChuongTrinh;
	
	
	
	
}
