## data

```sh
# build
apptainer build -F data/app.sif data/app.def
```

```sh
# run
apptainer run --containall data/app.sif data/app.def
```