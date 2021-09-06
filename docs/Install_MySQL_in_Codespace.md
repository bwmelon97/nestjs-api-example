## codespace에 설치 (Ubuntu, Azure)
Ubuntu 20.04.3 LTS

### 1. mysql-server 설치

```bash
$ sudo apt-get update
$ sudo apt-get install mysql-client
$ sudo apt-get install mysql-server    # mysql-client 없이 설치하면 오류 뜸.
```

### 2. mysql 시작

```bash
$ sudo service mysql start
* Starting MySQL database server mysqld  
su: warning: cannot change directory to /nonexistent: No such file or directory
```

### 3. mysql 접속

```bash
$ sudo /usr/bin/mysql -u root -p
Enter password:                    # 엔터 입력 (초기 비밀번호는 없음)
```

주의) `sudo mysql -u root -p` 를 하면, 어떤 비밀번호를 입력하더라도 permission denied 됨.

### 4. mysql root 비밀번호 설정

```bash
mysql> ALTER user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '변경할비밀번호';
     # ALTER user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
mysql> flush privileges;   # 변경 사항 저장
```

root 비밀번호를 설정해주면, 다음 번 접속 시

```bash
$ sudo mysql -u root -p
```

를 이용해서 mysql에 접속할 수 있다.

---

## Reference

[우분투에 Mysql 설치하기 (How to install Mysql-server in Ubuntu)](https://m.blog.naver.com/jesang1/221993846056)

[MySQL won't start - error: su: warning: cannot change directory to /nonexistent: No such file or directory](https://stackoverflow.com/questions/62987154/mysql-wont-start-error-su-warning-cannot-change-directory-to-nonexistent)

[System has not been booted with systemd as init system (PID 1). Can't operate](https://stackoverflow.com/questions/52197246/system-has-not-been-booted-with-systemd-as-init-system-pid-1-cant-operate)

[MySQL 8.0 비밀번호 변경하기! (MySQL 5.7버전 이상)](https://to-dy.tistory.com/58)