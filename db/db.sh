export DBHOST=localhost
export DBPORT=5432
export DBUSER=postgres
export DBPASS="\"\""
export DBNAME=postgres
go run db.go

# \du to show users
# CREATE USER postgres SUPERUSER;