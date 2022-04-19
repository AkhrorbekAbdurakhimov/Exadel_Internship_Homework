import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment';

describe('AuthService with Testbed', () => {
  const { apiUrl } = environment

  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Login', () => {
    it('should return user data', (done: DoneFn) => {
      const mockRes = {
        message: 'message',
        token: 'token',
        user: {
          id: 'id',
          email: 'email',
          firstName: 'firstName',
          lastName: 'lastName',
          dateOfBirth: 'dateOfBirth',
          country: 'Uzbekistan',
          currency: 'currency'
        }
      }
      service.login('akhrorbek20011707@gmail.com', 'password12345#').subscribe({
        next: (res) => {
          expect(res as any).toEqual(mockRes);
          done()
        }
      })
      const req = httpController.expectOne({
        method: 'POST',
        url: `${apiUrl}/api/auth/login`
      })
      req.flush(mockRes)
    })
  })

  it('setToken have to call on success', (done: DoneFn) => {
    spyOn(service as any, 'setToken');
    const expectedResult = {
      user: 'user',
      token: 'token',
    }
    service.login('email', 'password').subscribe(() => {
      expect((service as any).setToken).toHaveBeenCalledOnceWith(
        expectedResult
      );
      done();
    })
    const req = httpController.expectOne({
      method: 'POST',
      url: `${apiUrl}/api/auth/login`
    })
    req.flush(expectedResult)
  })

  it('setToken have not to call on error', (done: DoneFn) => {
    spyOn(service as any, 'setToken');
    service.login('email', 'password').subscribe({
      error: () => {
        expect((service as any).setToken).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${apiUrl}/api/auth/login`
    })
    req.error(new ProgressEvent('401'));
  });
});
