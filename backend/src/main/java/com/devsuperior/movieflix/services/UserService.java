package com.devsuperior.movieflix.services;

import java.util.Optional;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.movieflix.dto.UserDTO;
import com.devsuperior.movieflix.entities.User;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService{

	private static Logger logger = org.slf4j.LoggerFactory.getLogger(UserService.class);	
	
	@Autowired
	private AuthService authService ;
		
	@Autowired
	private UserRepository repository;	
	
	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {		
		authService.ValidateSelfOrAdmin(id);		
		Optional<User> obj = repository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found"));
		return new UserDTO(entity);
	}
	
	@Transactional(readOnly = true)
	public UserDTO loggedUser() {		
		User user = authService.authenticated();		
		return new UserDTO(user);
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user =  repository.findByEmail(username);
		if (user == null)
		{
			logger.error("User not Found "+ username);
			throw new UsernameNotFoundException("Email não cadastrado"); 
		}
		logger.info("User Found "+ username);
		return user;
	}	
}
