@if (count($errors) > 0)
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif

@if(session('success'))
    <p class="alert alert-success text-center">
        {{ session('success') }}
    </p>
@endif

@if(session('info'))
    <p class="alert alert-info text-center">
        {{ session('info') }}
    </p>
@endif

@if(session('warning'))
    <p class="alert alert-warning text-center">
        {{ session('warning') }}
    </p>
@endif

@if(session('error'))
    <p class="alert alert-danger text-center">
        {{ session('error') }}
    </p>
@endif
