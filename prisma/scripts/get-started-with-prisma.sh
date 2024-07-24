npx prisma init

# configure prisma/schema.prisma for db connection and models
# create prisma/services/crudService.ts base class to minimize code duplication
# create prisma/scripts/clobber.sh to iterate on models, have it delete migrations, drop tables, regenerate migrations and apply to fresh db
# when need to scale, create better migration workflow
