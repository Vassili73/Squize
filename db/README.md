# Database
Navigate to the /db directory\
\

Create database:
with linux:
```bash
sqlite3 squize.sqlite < create.sql
```
Add example data:
```bash
sqlite3 squize.sqlite < insert_examples.sql
```
\
if you get a error that the `'<'`-operator is unknown or reserved for future versions (powershell)\
follow these steps:\
# 1.
```bash
sqlite3 squize.sqlite
```
it should create a new file called `squize.sqlite` with the sqlite3 cli\
after that you execute these commands with the cli:\
# 2.
```bash
.read create.sql
```
# 3.
```bash
.read insert_examples.sql
```