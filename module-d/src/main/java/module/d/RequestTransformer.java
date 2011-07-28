/*
 * Copyright 2002-2011 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package module.d;

import java.util.List;
import java.util.Map;

import org.springframework.integration.Message;
import org.springframework.integration.MessageChannel;
import org.springframework.integration.support.MessageBuilder;

/**
 * @author Oleg Zhurakousky
 *
 */
public class RequestTransformer {

	public Message<?> transform(Message<Map<String, List<String>>> message){
		Map<String, List<String>> payload = message.getPayload();
		System.out.println("TRansforming Message: " + payload);
		List<String> searchString = (List<String>) payload.get("searchString");
		if (searchString == null){
			searchString = (List<String>) payload.get("formName");
		}
		String searchElement = searchString.get(0);
		return MessageBuilder.withPayload(searchElement).
				setReplyChannel((MessageChannel) message.getHeaders().getReplyChannel()).
				setErrorChannel((MessageChannel) message.getHeaders().getErrorChannel()).
				build();
	}
}
