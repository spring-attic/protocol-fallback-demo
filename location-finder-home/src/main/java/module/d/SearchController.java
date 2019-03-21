/*
 * Copyright 2002-2011 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package module.d;

import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author Oleg Zhurakousky
 *
 */
@Controller
public class SearchController {
	
	private final SearchUiGateway searchFormGateway;
	
	public SearchController(SearchUiGateway searchFormGateway){
		this.searchFormGateway = searchFormGateway;
	}  

	@RequestMapping("/search")
	public ModelAndView searchItemPage(String searchFormName){
		System.out.println("Invoking controller: " + searchFormName);
		ModelAndView mv = new ModelAndView();
		mv.setViewName("search");
//		String searchForm = this.searchFormGateway.renderSearchUiForm(searchFormName);
		String searchForm = null;
		try {
			Future<String> future = null;
			try {
				future = this.searchFormGateway.renderSearchUiForm(searchFormName);
				searchForm = future.get(1000, TimeUnit.MILLISECONDS);
			} catch (Exception e) {
				future = this.searchFormGateway.renderSearchUiForm(searchFormName);
				searchForm = future.get(1000, TimeUnit.MILLISECONDS);
			}		
		} catch (Exception e) {
			searchForm = "<b>'Search Item' form page is currently unavailable, please try again later</b>";
		}
		mv.addObject("searchForm", searchForm);
		return mv;
	}
}
