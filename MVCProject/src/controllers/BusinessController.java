package controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import data.BusinessDAO;

@Controller
public class BusinessController {

	@Autowired
	private BusinessDAO dao;
}
