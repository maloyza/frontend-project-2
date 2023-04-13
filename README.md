<h1 align="center"> Вычислитель отличий </h2>

### Hexlet tests and linter status:
[![Actions Status](https://github.com/maloyza/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/maloyza/frontend-project-46/actions)
[![Node CI](https://github.com/maloyza/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/maloyza/frontend-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/f5cab21122591a09bc49/maintainability)](https://codeclimate.com/github/maloyza/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f5cab21122591a09bc49/test_coverage)](https://codeclimate.com/github/maloyza/frontend-project-46/test_coverage)

<h2>Вычислитель отличий - предназначен для нахождения различий между файлами. </h2>
<p>Данный проект является консольным приложением, которое позволяет объединить два файла для обнаружения изменений между ними. Поддерживаемые типы файлов - это Json и Yaml. Формат изменений выводится на экране и доступен в форматах Json, Plain и Classic.</p>
<h2>Установка проекта </h2>
		<ul>
		  <li> 
		  	<p>Установка</p>
		  	</li>
		  	<pre>$git clone https://github.com/maloyza/frontend-project-46</br>$make install</pre>
		</ul>
<h4> Демонстрация нахождения отличий в формате stylish.</h4>
	<pre>node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json</pre>
		<p align="center">
		<a href="https://www.upload.ee/image/15115205/stylish.png" target="_blank"><img src="https://www.upload.ee/image/15115205/stylish.png" width="80%"/></a>
		</p>
<h4> Демонстрация нахождения отличий в формате plain.</h4>
	<pre>node bin/gendiff.js --format plain __fixtures__/file1.json __fixtures__/file2.json</pre>
		<p align="center">
		<a href="https://www.upload.ee/image/15115217/plain.png" target="_blank"><img src="https://www.upload.ee/image/15115217/plain.png" width="80%"/></a>
		</p>
<h4> Демонстрация нахождения отличий в формате json.</h4>
	<pre>node bin/gendiff.js --format json __fixtures__/file1.json __fixtures__/file2.json</pre>
		<p align="center">
		<a href="https://www.upload.ee/image/15115269/json.png" target="_blank"><img src="https://www.upload.ee/image/15115269/json.png" width="80%"/></a>
		</p>